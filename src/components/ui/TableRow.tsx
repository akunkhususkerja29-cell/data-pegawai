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

export function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`whitespace-nowrap px-4 py-3 ${className}`}>{children}</td>
}
