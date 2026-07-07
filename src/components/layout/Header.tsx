export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">
            IP
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Kantor Imigrasi Palembang
            </h1>
            <p className="text-xs text-gray-500">Data Pegawai</p>
          </div>
        </div>
      </div>
    </header>
  )
}
