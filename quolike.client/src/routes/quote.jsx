import {
    Form,
    redirect,
    useNavigation,
    useSubmit,
    useFetcher
} from "react-router-dom";
import { toggleAction } from "./root.jsx"

export default function Quote(props) {
    const fetcher = useFetcher();
    let isFavorite = props.isFavorite;
    let isArchived = props.isArchived;

    return (
        <div className="quote">
            <div className="quote--title">{props.title}</div>
            <div className="quote--content">{props.content}</div>
            <div className="quote--author">{props.author}</div>
            {props.tags && <div className="quote--tags">{props.tags}</div>}
            <fetcher.Form method="post" action="toggle">
                <input hidden name="externalId" defaultValue={props.id}></input>
                <input hidden name="isArchived" defaultValue={props.isArchived}></input>
                <button
                    name="isFavorite"
                    value={props.isFavorite ? false : true}
                    aria-label={props.isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {props.isFavorite ? "★" : "☆"}
                </button>
            </fetcher.Form>
            <fetcher.Form method="post" action="toggle">
                <input hidden name="externalId" defaultValue={props.id}></input>
                <input hidden name="isFavorite" defaultValue={props.isFavorite} ></input>
                <button
                    name="isArchived"
                    value={props.isArchived ? false : true}
                    aria-label={props.isArchived ? "Remove from archived" : "Add to archived"}
                >
                    {props.isArchived ? "📓" : "🗒"}
                </button>
            </fetcher.Form>
        </div>
    );
}