import { query } from '../../../lib/db';

export default async function ProductsPage() {
  const queryString = `
    SELECT
      p.id,
      p.product_name,
      p.product_brand,
      o.owner_name
    FROM products p
    JOIN products_owners po ON p.id = po.product_id
    JOIN owners o ON po.owner_id = o.id
    ORDER BY p.id;
  `;
  const products = await query({ query: queryString });

  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <h1 className="text-3xl font-bold mb-8 text-white">Product List</h1>

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border border-gray-200 w-full max-w-4xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Product Brand</th>
              <th scope="col" className="px-6 py-3">Product Owner</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {product.id}
                </td>
                <td className="px-6 py-4">{product.product_name}</td>
                <td className="px-6 py-4">{product.product_brand}</td>
                <td className="px-6 py-4">{product.owner_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}