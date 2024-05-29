export default function Quote(props) {
    return (
        <div>
            <div className="quote--title">{props.title}</div>
            <div className="quote--body">{props.body}</div>
        </div>
    );
}