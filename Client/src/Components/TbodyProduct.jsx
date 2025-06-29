import { Link } from "react-router-dom";

function TbodyProduct({ product, openModal }) {
  return (
    <tr key={product._id} className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b" title={product.productName}>
        {product.productName.length > 10
          ? product.productName.slice(0, 10) + "..."
          : product.productName}
      </td>
      <td className="py-2 px-4 border-b">₹{product.price}</td>
      <td className="py-2 px-4 border-b">{product.category}</td>
      <td className="py-2 px-4 border-b">{product.stock}</td>
      <td className="py-2 px-4 border-b">
        <Link
          onClick={() => openModal(product, "view")}
          className="text-blue-600 hover:text-blue-800 transition duration-200"
        >
          View
        </Link>
      </td>
      <td className="py-2 px-4 border-b">
        <Link
          onClick={() => openModal(product, "edit")}
          className="text-yellow-600 hover:text-yellow-800 transition duration-200"
        >
          Edit
        </Link>
      </td>
      <td className="py-2 px-4 border-b">
        <Link
          onClick={() => openModal(product, "delete")}
          className="text-red-600 hover:text-red-800 transition duration-200"
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}

export default TbodyProduct;
