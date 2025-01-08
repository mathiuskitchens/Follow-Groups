
export const HomeSkeleton = () => {
  return (
    <div className="flex flex-col w-5/6 gap-4 mx-auto mt-4">
    <div className="w-full h-32 skeleton"></div>
    <div className="h-4 skeleton w-28"></div>
    <div className="w-full h-4 skeleton"></div>
    <div className="w-full h-4 skeleton"></div>
  </div>
  )
}

export const HistorySkeleton = () => {
    return (
      <div className="flex flex-col w-5/6 gap-4 mx-auto mt-4">
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>

      </div>
    )
  }

