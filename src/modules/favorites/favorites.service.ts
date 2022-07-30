import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private favsRepository: Repository<Favorite>,
  ) {
    this.favsRepository.find().then((value) => {
      if (!value.length) {
        const favs = this.favsRepository.create();
        this.favsRepository.save(favs);
      }
    });
  }

  async addArtistToFavourites(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new UnprocessableEntityException();

    const favs = await this.findAll();
    favs.artists.push(artist);
    this.favsRepository.save(favs);

    return { statusCode: 201, message: 'Added successfully' };
  }

  async removeArtistToFavourites(id: string) {
    const favs = await this.findAll();

    favs.artists = favs.artists.filter((artist) => artist.id !== id);
    return this.favsRepository.save([favs]);
  }

  async addAlbumToFavourites(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new UnprocessableEntityException();

    const favs = await this.findAll();
    favs.albums.push(album);
    this.favsRepository.save(favs);

    return { statusCode: 201, message: 'Added successfully' };
  }

  async removeAlbumToFavourites(id: string) {
    const favs = await this.findAll();

    favs.albums = favs.albums.filter((album) => album.id !== id);
    return this.favsRepository.save([favs]);
  }

  async addTrackToFavourites(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new UnprocessableEntityException();

    const favs = await this.findAll();
    favs.tracks.push(track);
    this.favsRepository.save(favs);

    return { statusCode: 201, message: 'Added successfully' };
  }

  async removeTrackToFavourites(id: string) {
    const favs = await this.findAll();

    favs.tracks = favs.tracks.filter((track) => track.id !== id);
    return this.favsRepository.save([favs]);
  }

  async findAll() {
    return (
      await this.favsRepository.find({
        relations: { artists: true, albums: true, tracks: true },
      })
    )[0];
  }
}
