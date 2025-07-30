import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { resetPasswordSchema, type ResetPasswordSchema } from "@/schemas/request-code.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom"


export const ResetPasswordPage = () =>{
    const [searchParams] = useSearchParams();
    const emailParam = searchParams.get("email") || "";
    const [showPassword, setShowPassword] = useState(false);
    const{resetPassword, isLoading} = usePasswordReset()

   
    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema)
        ,defaultValues:{
            email: emailParam,
            codigo: '',
            nuevaPassword: '',
        }
    })

    useEffect(() =>{
        if(emailParam) form.setValue("email", emailParam);
    },[emailParam, form])

    const onSubmit = (values: ResetPasswordSchema)=>{
        resetPassword(values)
    }

return(
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Restablecer contraseña</h1>
        <p className="mt-2 text-sm text-gray-600">Ingrese el codigo enviado a su email</p>
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
                    {...field}
                    readOnly={!!emailParam}
                    className={(fieldState.invalid ? 'border-red-500' : '' )+
                        (emailParam ? ' bg-gray-100 cursor-not-allowed' : '')
                    }
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />

             <FormField
            control={form.control}
            name="codigo"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Cogigo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ingrese el codigo"
                    inputMode="numeric"
                    maxLength={6}
                    className={fieldState.invalid ? 'border-red-500' : '' }
                    onInput={(e) => {
                        const input = e.currentTarget;
                        input.value = input.value.replace(/\D/g, "").slice(0, 6);
                        field.onChange(input.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
  
  <FormField
            control={form.control}
            name="nuevaPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="nueva contraseña"
                      {...field}
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <FormMessage /> 
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </Button>
  <div className="text-center mt-4">
            <Link to="/auth/request-code" className="text-sm text-blue-500 hover:underline">
              Solicitar nuevo código
            </Link>

            </div>
       
        </form>
      </Form>
    </div>
)

}