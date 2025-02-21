import './style.css'

export const ErrorMessage = (
    {
        error = ''
    }: {
        error: string
    }
) => {
  return error && <p className="error__text">{error}</p>
}
