
### Como o Jules deve codar frontend

- Sempre perguntar primeiro: "Este componente precisa de interatividade no client? Se não, fazer Server Component."
- Priorizar Server Actions para mutações (forms, botões)
- Usar TanStack Query para dados assíncronos (listas, detalhes)
- Criar componentes reutilizáveis e composable (ex: DataTable, Card, FormField)
- Colocar lógica de negócio nos Server Actions ou em hooks useServerAction
- Evitar useEffect sempre que possível (usar Suspense + loading states)
- Manter consistência visual com shadcn/ui ou theme próprio baseado em Tailwind
- Comentar invariantes importantes do domínio no código
- Sempre adicionar tipos Zod para formulários e API responses

### Exemplo de como deve ficar um form moderno (2026 style)

```tsx
'use client'

import { useActionState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createEventoAction } from '@/actions/eventos'

const schema = z.object({
nome: z.string().min(3),
dataInicio: z.string().pipe(z.coerce.date()),
})

type FormValues = z.infer<typeof schema>

export function NovoEventoForm() {
const [state, formAction, isPending] = useActionState(createEventoAction, null)

const form = useForm<FormValues>({
 resolver: zodResolver(schema),
 defaultValues: { nome: '', dataInicio: '' },
})

return (
 <form action={formAction} className="space-y-6">
   <Input {...form.register('nome')} placeholder="Nome do evento" />
   <Input type="date" {...form.register('dataInicio')} />
   <Button type="submit" disabled={isPending}>
     Criar evento
   </Button>
   {state?.error && <p className="text-red-500">{state.error}</p>}
 </form>
)
}
