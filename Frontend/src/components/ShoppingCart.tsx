import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem as CartItemComponent } from "./CartItem"; // Ganti nama import agar tidak konflik

export function ShoppingCart({ isOpen }: { isOpen: boolean }) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {/* Menggunakan 'productId' sebagai key unik dari data API */}
          {cartItems.map((item) => (
            <CartItemComponent key={item.productId} {...item} id={item.productId} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              // Perhitungan total sekarang langsung dari cartItems
              cartItems.reduce((total, cartItem) => {
                // Tidak perlu lagi mencari di file lain
                return total + cartItem.price * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}