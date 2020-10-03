let count = 0;
let count1 = 0;
let removeArrAlbums = [];
let removeArr = [];
let artistList = [];
artistList = artists;
let removeArtists = [];
let artistcount = 0;

function addAlbums() {
    removeOptions();
    if (count1 == 0) {
        var selectNames = document.getElementById("albums");
        removeArrAlbums = albums;
        for (let i = 0; i < albums.length; i++) {
            const options = document.createElement("option");
            const textOfOption = document.createTextNode(albums[i].name);
            options.appendChild(textOfOption);
            selectNames.appendChild(options);
        }

        var selectedArtists = document.getElementById("artists");
        removeArtists = artistList;
        for (let i = 0; i < artistList.length; i++) {
            const option = document.createElement("option");
            const textOption = document.createTextNode(artistList[i].artistName);
            option.appendChild(textOption);
            option.setAttribute('value', artistList[i].artistId);
            selectedArtists.appendChild(option);
        }
    }
    count1++;
}

function selectedOptionFn(optionSelected) {
    removeLi();
    if (count == 0) {
        const objectSelected = albums.filter(value => {
            return value.name == optionSelected;
        })
        let songNames = document.getElementById("songs");
        for (let index of objectSelected) {
            const albumName = index.name;
            document.getElementById("movieName").innerHTML = albumName;
            let songsArray = index.songs;
            removeArr = songsArray;
            for (let abc of songsArray) {
                var songOptions = document.createElement("li");
                songOptions.id = abc.songId;
                songOptions.innerHTML = abc.songName;
                songOptions.classList.add('cursor')
                songOptions.addEventListener('click', () => { displaySongDetails(objectSelected, abc.songName) }, false);
                songNames.appendChild(songOptions);
            }
        }
    }
    count++;
}

function removeLi() {
    if (count > 0) {
        for (let abc of removeArr) {
            const listItem = document.getElementById(abc.songId);
            listItem.remove();
        }
        count = 0;
        removeArr = [];
    }
}

function removeOptions() {
    if (count1 > 0) {
        for (let a of removeArrAlbums) {
            const albumN = document.getElementById(a.name);
            albumN.remove();
        }
        for (let b of removeArtists) {
            const artistN = document.getElementById(b.artistName);
            artistN.remove();
        }
        count1 = 0;
        removeArrAlbums = [];
        removeArtists = [];
    }
}



function displaySongDetails(objectData, songName2) {
    const songObject = objectData;
    for (let index of songObject) {
        let songsArray = index.songs;
        for (let abc of songsArray) {
            if (songName2 == abc.songName) {
                document.getElementById("songDetails").innerHTML = "Album Name : " + index.name + "<br>" +
                    "Song Name : " + abc.songName + "<br>" +
                    "Released Year : " + index.year + "<br>" +
                    "Artist Name : " + abc.artistName;

                // console.log(e);
                let data = document.getElementById('songPlay')
                data.src = abc.song;
                data.autoplay = true
                console.log(index.name, "gsdygfhgfjhgjgh");
            }
        }
    }
}
function removeArtistItem(){
    if (artistcount > 0) {
        for (let i of songByArtist1) {
            let removeid = document.getElementById(i.title.songId)
            removeid.remove()
        }
        artistcount = 0;
        songByArtist1 = "";
    }
}
function selectedArtistFn(e) {
    removeArtistItem();
    if (artistcount == 0) {
        let listOfArtists = artistList;

        let listOfFilteredArtists = listOfArtists.filter(ele => {
            return ele.artistId == e;
        })
        let artistId = listOfFilteredArtists.reduce(item => { return item.artistId });
        console.log(artistId, "listOfFilteredArtists");
        songByArtist = getSongsByArtist(artistId.artistId);
        console.log(songByArtist, "songByArtist");
        songByArtist1 = songByArtist
        for (const song of songByArtist1) {
            let list = document.getElementById('artId');
            let listItem = document.createElement('li');
            listItem.id = song.title.songId;
            const textValue = document.createElement("b");
            textValue.innerHTML = " Movie Name : " + song.albumName + "     Song Name : " + song.title.songName
            listItem.appendChild(textValue);
            listItem.classList.add('name');
            listItem.addEventListener('click', () => {
                playSongs(song.title.song)
            }, false)
            list.appendChild(listItem); 
            document.getElementById('artistName').innerHTML = artistId.artistName;
        }
    }
    artistcount++;
}
function getSongsByArtist(artistId) {
    let resultList = []
    albums.map(a => {
        let songs = a.songs
        for (let i in songs) {
            let artist = songs[i].artistId
            if (artist == artistId) {
                let song = {
                    albumName: a.name,
                    title: songs[i]
                }
                resultList.push(song)
            }
        }
    })
    return resultList
}

function playSongs(e) {
    console.log(e, "");
    let data = document.getElementById('songPlay1')
    data.src = e
    data.autoplay = true
}