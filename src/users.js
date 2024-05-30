function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('./assets/images/icons', false, /\.(png|jpe?g|svg)$/));

const users = [
    { name: "Jane Smith", image: images['Rectangle 911.png'] },
    { name: "Trivikraman", image: images['vikram.png'] },
    { name: "Sneha", image: images['alice.png'] },
];

export default users;
