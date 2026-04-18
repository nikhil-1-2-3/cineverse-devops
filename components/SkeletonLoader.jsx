import '../styles/SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-poster" />
            <div className="skeleton-info">
              <div className="skeleton-title" />
              <div className="skeleton-meta">
                <div className="skeleton-text short" />
                <div className="skeleton-text short" />
              </div>
              <div className="skeleton-genres">
                <div className="skeleton-tag" />
                <div className="skeleton-tag" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'details') {
    return (
      <div className="skeleton-details">
        <div className="skeleton-poster-large" />
        <div className="skeleton-details-info">
          <div className="skeleton-title-large" />
          <div className="skeleton-badges">
            <div className="skeleton-badge" />
            <div className="skeleton-badge" />
            <div className="skeleton-badge" />
          </div>
          <div className="skeleton-description">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
