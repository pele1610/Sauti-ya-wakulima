function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 border disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-gray-600">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 border disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination