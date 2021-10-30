export default function FilterLabel(props) {
  return (
    <span style={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
      {props.icon}
      {props.title}
    </span>
  );
}
