const EbookCover = ({ src, alt }: { src?: string; alt: string }) => {
  if (!src) {
    return <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded w-full aspect-[2/3] text-gray-500 dark:text-gray-300 font-semibold">No Cover Available</div>
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="rounded object-cover w-full"
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
}

export default EbookCover
