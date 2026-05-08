import "./CakePreview.css";
import CakeScene from "./Scene";
export default function CakePreview({ selectedCake }) {
  const Shape = selectedCake?.component;

  return (
    <div className="preview">

      <h3>Preview</h3>

      <div className="stage">
        {Shape ? (
          <CakeScene>
            <Shape />
          </CakeScene>
        ) : (
          <p className="empty">Select a cake</p>
        )}
      </div>

      <div className="price-box">
        {selectedCake ? (
          <>
            <div>
              <p>Price</p>
              <h2>{selectedCake.basePrice} DA</h2>
            </div>
            <button>Order</button>
          </>
        ) : (
          <p className="empty">No cake selected</p>
        )}
      </div>

    </div>
  );
}