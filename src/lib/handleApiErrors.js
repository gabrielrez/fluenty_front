export function handleApiErrors(error) {
    const response = error.response;

    if (!response) {
        return ['Erro de conexão com o servidor.'];
    }

    const { status, data } = response;

    if (status === 422 && data?.errors) {
        return Object.values(data.errors).flat();
    }

    if (data?.message) {
        return ['Credenciais inválidas.'];
    }

    return ['Erro inesperado. Tente novamente.'];
}