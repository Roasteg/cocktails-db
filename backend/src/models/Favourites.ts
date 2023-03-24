import mongoose from "mongoose";

interface IFavourite {
    userId: string;
    recipeId: number;
}

interface IFavouriteDoc extends mongoose.Document {
    userId: string;
    recipeId: number;
}

interface IFavouriteModel extends mongoose.Model<IFavouriteDoc> {
    build(favourite: IFavourite): IFavouriteDoc;
}

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    recipeId: {
        type: Number,
        required: true
    }
});

favouriteSchema.statics.build = (favourite: IFavourite) => {
    return new Favourite(favourite);
}

const Favourite = mongoose.model<IFavouriteDoc, IFavouriteModel>('Favourite', favouriteSchema);

export { Favourite, IFavourite };