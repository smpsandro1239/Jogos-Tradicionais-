import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilizadoresService } from '../utilizadores/utilizadores.service';
import { UserRole } from '../utilizadores/utilizador.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UtilizadoresService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      nome: dto.nome,
      email: dto.email,
      password_hash,
      role: UserRole.USER,
      aldeia: dto.aldeiaId ? ({ id: dto.aldeiaId } as any) : null,
    });

    const { password_hash: _, ...result } = user as any;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      aldeiaId: user.aldeia?.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
