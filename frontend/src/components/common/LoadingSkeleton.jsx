function LoadingSkeleton({ rows = 5 }) {
    return (
        <div className="skeleton-table" aria-label="Loading students">
            {Array.from({ length: rows }).map((_, index) => (
                <div className="skeleton-row" key={index}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            ))}
        </div>
    );
}

export default LoadingSkeleton;
