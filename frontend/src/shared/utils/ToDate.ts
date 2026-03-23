export const toDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('pt-BR');
}