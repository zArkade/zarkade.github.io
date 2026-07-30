export function formatDate(dateString: string | undefined | null, locale: string): string {
  if (!dateString) {
    return "Data indisponível";
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return "Data inválida";
  }
}