// SONG ARRAY
let songs = [
  // 🎵🎶 POP SONGS
  {
    id: 1,
    name: "Pop background",
    artist: "Aryan",
    img: "images/pop image.jpeg",
    genre: "pop",
    src: "media/fun pop background.mp3"
  },
  {
    id: 2,
    name: "First Light",
    artist: "Madhuvan",
    img: "images/firstlight.jpeg",
    genre: "pop",
    src: "media/first light.mp3"
  },

  // 🎸 ROCK SONGS
  {
    id: 3,
    name: "Surf Rock",
    artist: "Harry",
    img: "images/rock1.jpg",
    genre: "rock",
    src: "media/surf rock.mp3"
  },
  {
    id: 4,
    name: "Rock Intro",
    artist: "Shourya",
    img: "images/rock intro.jpeg",
    genre: "rock",
    src: "media/rock intro.mp3"
  }
];

let currentSongIndex = 0;
let playlists = {};
let selectedPlaylist = null;

// THEME TOGGLE
function toggleTheme() {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    currentTheme === "light" ? "dark" : "light"
  );
}

// SHOW SONGS
function showSongs(filter = "all") {
  let container = document.getElementById("songsList");
  container.innerHTML = "";

   let filteredSongs = filter === "all"
    ? songs
    : songs.filter(song => song.genre === filter);

  filteredSongs.forEach((song, index) => {
    let div = document.createElement("div");
    div.innerHTML = `${song.name} - ${song.artist}`;
    div.onclick = () => renderCurrentSong(index);
    container.appendChild(div);
  });
}

// RENDER CURRENT SONG
function renderCurrentSong(index) {
  currentSongIndex = index;
  let song = songs[index];

  document.getElementById("songImg").src = song.img;
  document.getElementById("songName").textContent= song.name;
  document.getElementById("songArtist").textContent = song.artist;

  let audio = document.getElementById("audioPlayer");
  audio.src = song.src;
  audio.play();
}

// NEXT SONG
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong(currentSongIndex);
}

// PREVIOUS SONG
function prevSong() {
  currentSongIndex =
    (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong(currentSongIndex);
}

// CREATE PLAYLIST
function createPlaylist() {
  let name = document.getElementById("playlistName").value;
  if (!name) return;

  playlists[name] = [];
  renderPlaylists();
}

// RENDER PLAYLISTS
function renderPlaylists() {
  let container = document.getElementById("playlistList");
  container.innerHTML = "";

  for (let key in playlists) {
    let div = document.createElement("div");
    div.innerText = key;
    div.onclick = () => renderPlaylistSongs(key);
    container.appendChild(div);
  }
}

// ADD TO PLAYLIST
function addToPlaylist() {
  if (!selectedPlaylist) {
    alert("Select playlist first");
    return;
  }

  playlists[selectedPlaylist].push(songs[currentSongIndex]);
  renderPlaylistSongs(selectedPlaylist);
}

// SHOW PLAYLIST SONGS
function renderPlaylistSongs(name) {
  selectedPlaylist = name;
  let container = document.getElementById("playlistSongs");
  container.innerHTML = `<h3>${name}</h3>`;

  playlists[name].forEach(song => {
    let div = document.createElement("div");
    div.innerText = song.name;
    container.appendChild(div);
  });
}

// // FILTER EVENT
document.getElementById("genreFilter")
  .addEventListener("change", function () {
    showSongs(this.value);
    });
// INITIAL LOAD
showSongs();
renderCurrentSong(0);