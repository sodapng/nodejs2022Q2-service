import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ArtistService, AlbumService, FavoritesService],
})
export class TrackModule {}
