import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import {
    resetPasswordSchema,
    type ResetPasswordSchema,
} from '@/schemas/password-reset.schema';
import { Link, useSearchParams } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const emailParam = searchParams.get('email') || '';
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: emailParam,
            codigo: '',
            nuevaPassword: '',
        },
    });

    useEffect(() => {
        if (emailParam) form.setValue('email', emailParam);
    }, [emailParam, form]);

    const { resetPassword, isLoading } = usePasswordReset();

    const onSubmit = (values: ResetPasswordSchema) =>
        resetPassword(values);

    return (
        <div className="max-w-md mx-auto mt-16 p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Restablecer Contraseña</h1>
                <p className="mt-2 text-sm text-gray-600">Ingresa el código y la nueva contraseña</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email (readonly si viene por params) */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="tu email"
                                        {...field}
                                        readOnly={!!emailParam}
                                        className={
                                            (fieldState.invalid ? 'border-red-500 ' : '') +
                                            (emailParam ? 'bg-gray-50 cursor-not-allowed' : '')
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Código */}
                    <FormField
                        control={form.control}
                        name="codigo"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Código de Verificación</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="código recibido"
                                        maxLength={6}
                                        inputMode="numeric"
                                        className={fieldState.invalid ? 'border-red-500' : ''}
                                        onInput={(e) => {
                                            const input = e.currentTarget;
                                            input.value = input.value.replace(/\D/g, '').slice(0, 6);
                                            field.onChange(input.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Nueva Contraseña */}
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
                        {isLoading ? 'Restableciendo…' : 'Restablecer Contraseña'}
                    </Button>
                </form>
            </Form>

            <div className="text-center space-y-2">
                <Link
                    to="/auth/request-code"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                >
                    ¿No recibiste el código? Solicitar código
                </Link>
                <Link
                    to="/auth/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Volver al login
                </Link>
            </div>
        </div>
    );
};
