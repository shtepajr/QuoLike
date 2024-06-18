import {
    Form,
    redirect,
    useNavigation,
    useSubmit,
    useFetcher,
} from "react-router-dom";
export default function Quote(props) {
    let isFavorite = props.isFavorite;
    let isArchived = props.isArchived;

    return (
        <div className="quote">
            <div className="quote--title">{props.title}</div>
            <div className="quote--content">{props.content}</div>
            <div className="quote--author">{props.author}</div>
            {props.tags && <div className="quote--tags">{props.tags}</div>}

            {/*<button value={isFavorite ? false : true} onClick={() => props.toggleFavorite(props.id)}>*/}
            {/*    {isFavorite ? "★" : "☆"}*/}
            {/*</button>*/}
            <Favorite quote={props}></Favorite>
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

function Favorite({ quote }) {
    const fetcher = useFetcher();
    let isFavorite = quote.isFavorite;

    if (fetcher.formData) {
        isFavorite = fetcher.formData.get("isFavorite") === "true";
    }
    return (
        <fetcher.Form method="post">
            <input hidden name="id" defaultValue={quote.id}></input>
            <button
                name="isFavorite"
                value={isFavorite ? "false" : "true"}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
