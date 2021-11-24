interface Props {
  toggle: () => void;
}

const AddBookmarkModal = ({ toggle }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "white",
      }}
    >
      <div>
        Create a new bookmark{" "}
        <span
          onClick={toggle}
          style={{
            float: "right",
            padding: "30px",
          }}
        >
          X
        </span>
      </div>
      <form>
        <div>
          <label>
            Insert your URL
            <input type="text" name="url" />
          </label>
        </div>

        <input
          type="button"
          value="Load metadata"
          placeholder="https://company.com"
        />

        <div>
          <div>Meta Image</div>
          <div
            style={{
              width: "200px",
              height: "100px",
              background: "#ddd",
            }}
          ></div>
        </div>

        <div>
          <label>
            Meta Title
            <input
              type="text"
              name="title"
              placeholder="Ex. Welcome to my website"
            />
          </label>
        </div>

        <div>
          <label>
            Meta Description
            <input type="text" name="description" />
          </label>
        </div>

        <input type="button" value="Save bookmark" />
      </form>
    </div>
  );
};

export default AddBookmarkModal;
