function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('./assets/images/icons', false, /\.(png|jpe?g|svg)$/));

const initialComments = [
    { name: "Jane Smith", image: images['Rectangle 911.png'], comment: "Thanks for assigning me on the task. We’ll get the details ironed out." },
    { name: "Jane Smith", image: images['Rectangle 911.png'], comment: "Click the check mark on the TOP LEFT CORNER to mark the event status as COMPLETE" },
];

export default initialComments;
