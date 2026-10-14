interface ContactFieldProps {
  name: string
  label: string
  prompt: string
  type?: string
  autoComplete?: string
  maxLength: number
  multiline?: boolean
}

export default function ContactField({
  name,
  label,
  prompt,
  type = 'text',
  autoComplete,
  maxLength,
  multiline = false,
}: ContactFieldProps) {
  const attributes = {
    id: `contact-${name}`,
    name,
    placeholder: ' ',
    required: true,
    maxLength,
    autoComplete,
    className: 'contact-field-input',
  }

  return (
    <label htmlFor={attributes.id} className="contact-field">
      <span className="contact-field-label">{label}</span>
      <span className="contact-field-control">
        {multiline ? (
          <textarea {...attributes} rows={4} />
        ) : (
          <input {...attributes} type={type} />
        )}
        <span className="contact-field-prompt" aria-hidden="true">
          {prompt}
        </span>
        <span className="contact-field-line" aria-hidden="true" />
      </span>
    </label>
  )
}
