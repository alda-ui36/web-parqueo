import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    requestCodeSchema,
    type RequestCodeSchema,
} from '@/schemas/password-reset.schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const RequestCodePage = () => {
    // 1) Usamos el esquema y el tipo correctos
    const form = useForm<RequestCodeSchema>({
        resolver: zodResolver(requestCodeSchema),
        defaultValues: { email: '' },
    });

    // 2) Desestructuramos requestCode en lugar de resetPassword
    const { requestCode, isLoading } = usePasswordReset();

    // 3) onSubmit llama a requestCode con el tipo RequestCodeSchema
    const onSubmit = (values: RequestCodeSchema) =>
        requestCode(values);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Ingresa tu email para recibir un código de verificación
                </p>
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
                                        placeholder="ingrese su email"
                                        {...field}
                                        className={fieldState.invalid ? 'border-red-500' : ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Enviando código...' : 'Enviar Código'}
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <Link
                    to="/auth/login"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Volver al login
                </Link>
            </div>
        </div>
    );
};
