export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="flex-1 ml-4">
        <h2 className="font-medium">{item.name}</h2>
        <p className="text-gray-500 text-sm">#{item.id}</p>
      </div>
      <div className="flex items-center border rounded">
        <button onClick={onDecrease} className="px-3">-</button>
        <span className="px-4">{item.quantity}</span>
        <button onClick={onIncrease} className="px-3">+</button>
      </div>
      <span className="w-20 text-right font-medium">${item.price * item.quantity}</span>
      <button onClick={onRemove} className="ml-4 text-gray-400 hover:text-red-500">×</button>
    </div>
  );
}