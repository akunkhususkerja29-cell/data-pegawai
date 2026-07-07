interface TableProps {
  headers: string[]
  children: React.ReactNode
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-medium text-gray-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  )
}
