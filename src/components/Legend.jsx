function Legend({ items }) {
  return (
    <section className="legend-panel" aria-label="Legend">
      {items.map((item) => (
        <div className="legend-item" key={item.id}>
          <span className={`legend-swatch is-${item.color}`} aria-hidden="true" />
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  )
}

export default Legend