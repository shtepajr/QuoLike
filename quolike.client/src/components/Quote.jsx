export default function Quote(props) {
    let isFavorite = props.isFavorite;
    let isArchived = props.isArchived;

    return (
        <div className="quote">
            <div className="quote--title">{props.title}</div>
            <div className="quote--content">{props.content}</div>
            <div className="quote--author">{props.author}</div>
            {props.tags && <div className="quote--tags">{props.tags}</div>}

            <button value={isFavorite ? false : true} onClick={() => props.toggleFavorite(props.id)}>
                {isFavorite ? "★" : "☆"}
            </button>
            <button value={isArchived ? false : true} onClick={props.toggleArchived}>
                {isArchived ? "📓" : "🗒"}
            </button>
            <form method="post">
 
            </form>
            <form method="post">
   
            </form>
        </div>
    );
}