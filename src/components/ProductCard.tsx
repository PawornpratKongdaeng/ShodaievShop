import Link from 'next/link'

export const ProductCard = ({ product }: { product: any }) => {
  const imageUrl = (product.image && typeof product.image === 'object') 
    ? product.image.url 
    : '';

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 h-full hover:border-orange-200">
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              alt={product.name}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 bg-slate-200">ไม่มีรูปภาพ</div>
          )}
          
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {product.compatibility?.slice(0, 2).map((c: any, i: number) => (
              <span key={i} className="text-[10px] text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
                {c.make} {c.model}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">ราคาพิเศษ</span>
              <span className="text-2xl font-black text-red-600">
                ฿{product.price?.toLocaleString()}
              </span>
            </div>
            
            {/* Circle Arrow Button */}
            <div className="h-11 w-11 bg-orange-500 text-white rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-45 shadow-md shadow-orange-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}