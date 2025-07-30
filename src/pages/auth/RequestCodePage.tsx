import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePasswordReset } from "@/hooks/usePasswordReset"
import { requestCodeSchema, type RequestCodeSchema } from "@/schemas/request-code.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"


export const RequestCodePage = () =>{
    const form = useForm<RequestCodeSchema>({
        resolver: zodResolver(requestCodeSchema),
        defaultValues: { email: '' },
    })

    const {requestCode, isLoading} = usePasswordReset();
    const onSubmit = (values: RequestCodeSchema) => {
        requestCode(values)
    }

    return(

         <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Solicitar Codigo</h1>
        <p className="mt-2 text-sm text-gray-600">Ingrese su email para solicitar el codigo</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  type="email"
                    placeholder="ingrese su  email"
                    {...field}
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />

       

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando Codigo...' : 'Enviar Codigo'}
          </Button>

         <div className="text-center mt-4">
            <Link to="/auth/login" className="text-sm text-blue-500 hover:underline">
              volver al inicio de sesión
            </Link>

            </div>
        </form>
      </Form>
    </div>
    )
}