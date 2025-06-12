const EbookCover = ({ src, alt }: { src?: string; alt: string }) => {
  if (!src) {
    return <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded w-full aspect-[2/3] text-gray-500 dark:text-gray-300 font-semibold">No Cover Available</div>
  }

  return <img src={src} alt={alt} className="rounded object-cover transition-transform duration-300 ease-in-out hover:scale-105 w-full" />
}

export default EbookCover
