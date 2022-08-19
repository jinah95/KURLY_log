import React from "react";

const Loader = ({ style }) => (
    <div style={style} className="list-group-loader">
        <div className="loader"></div>
    </div>
);

const Item = ({ image, num, style, loading }) => (
    <div style={style} className="list-group-item">
        <div className="avatar">
            <img
                alt="avatar"
                src={image}
                style={{ width: "50%", height: "50%" }}
            />
        </div>

        <div className="details">
            <div className="number">
                <div className="info">
                    <p className="number">#{num + 1}</p>
                </div>
            </div>
        </div>
    </div>
);

const RowComponent = ({ image, num, style, loading }) => {
    return loading ? (
        <Loader style={style} />
    ) : (
        <Item image={image} num={num} style={style} loading={loading} />
    );
};

export default RowComponent;
