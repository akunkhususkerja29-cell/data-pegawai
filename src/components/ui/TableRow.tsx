interface TableRowProps {
  children: React.ReactNode
  highlight?: boolean
}

export function TableRow({ children, highlight }: TableRowProps) {
  return (
    <tr className={`transition hover:bg-gray-50 ${highlight ? "bg-blue-50" : ""}`}>
      {children}
    </tr>
  )
}

interface TdProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function Td({ children, className = "", title }: TdProps) {
  return (
    <td className={`whitespace-nowrap px-4 py-3 ${className}`} title={title}>
      {children}
    </td>
  )
}
