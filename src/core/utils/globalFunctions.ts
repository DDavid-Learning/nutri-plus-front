export function formatCPF(cpf: string): string {
    const cleanedCPF = cpf.replace(/\D/g, '');
    return cleanedCPF.replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }