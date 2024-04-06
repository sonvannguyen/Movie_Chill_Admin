const fs = require('fs');
const MovieModel = require('../models/Movie')
const MovieGroupModel = require('../models/MovieGroup')
const createError = require('http-errors')


// xử lí khi người dùng tìm kiếm tên phim mà không gõ dấu . Tận dụng slug có sẵn trong db để tìm kiếm.

const convertToSlug = (movieName) => {
    const arrWord = movieName.split(" ").filter(word => word !== "")
    let movieSlug = ""
    for(let i = 0; i < arrWord.length - 1; i++){
        movieSlug += arrWord[i] + "-"
    }
    movieSlug += arrWord[arrWord.length-1] 
    
    return movieSlug
}

const movieController = {
    // auto create from data json
    addMoviesFromFileData : async (req, res) => {
        // === create movies from data in file moviesData.json
        try {
            fs.readFile(`F:/movie/server/moviesData.json`, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const movieData = JSON.parse(data)
                movieData.forEach(async(item, index) => {
                    const newMovie = new MovieModel(item)
                    await newMovie.save()
                    console.log('save ', index+1)
                })
                console.log('SUCCESS')
            });
            
        } catch (error) {
            console.log(error)
        }
    },
    
    createMovie: async (req, res, next) => {
        try {
            // handle array category when send many values in body
            const {category:categoryRaw} = req.body
            category = categoryRaw?.split(',')

            const newMovie = new MovieModel({...req.body, category })
            await newMovie.save()   

            return res.json({newMovie})
        } catch (error) {
            next(error)
        }
    },
    getMovieDetail: async (req, res, next) => {
        try {
            // handle array category when send many values in body
            const {slug} = req.params
            const movieData = await MovieModel.findOne({slug}).populate({
                path: 'comments',
                populate: {
                    path: 'userComment',
                    select: 'username avatar isAdmin'
                }
            })

            if(!movieData){
                res.status(404).json('Not found movie')
            }
            
            return res.json(movieData)
        } catch (error) {
                  next(error)
        }
    },
    updateMovie: async (req, res, next) => {
        try {
            const {movieId} = req.params
            const newMovie = await MovieModel.findByIdAndUpdate(movieId, req.body, {new:true})
            await newMovie.save()

            return res.json({newMovie})
        } catch (error) {
            next(error)
        }
    },
    
    deleteMovie: async (req, res, next) => {
        try {
            const {movieId} = req.params
            await MovieModel.findByIdAndDelete(movieId)

            const movieGroup = await MovieGroupModel.findOne({
                movieList: { $in: [movieId]}
            })

            if(movieGroup){
                movieGroup.movieList = movieGroup.movieList.filter(movie => movie != movieId)
                await movieGroup.save()
            }

            return res.json({movieGroup})
        } catch (error) {
            next(error)
        }
    },
    getAllMovie: async(req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const moviesPerPage = parseInt(req.query.limit) || 12

            let totalMovies = await MovieModel.countDocuments()
            let totalPage = Math.ceil(totalMovies / moviesPerPage)

            const moviesData = await MovieModel.find({})
            .skip((moviesPerPage * page) - moviesPerPage)
            .limit(moviesPerPage)

            return res.json({
                totalPage,
                currentPage: page,
                moviesPerPage,
                moviesData
            })

        } catch (error) {
            next(error)
        }
    },
    searchMovieByName: async(req, res, next) => {
        try {
            const {movieName } = req.query
            const page = parseInt(req.query.page) || 1
            const moviePerPage = parseInt(req.query.limit) || 12

            const query = {
                $or: [
                    {
                        name: {
                            $regex: movieName, $options: "i"
                        }
                    },
                    {
                        origin_name: {
                            $regex: movieName, $options: "i"
                        }
                    },
                    {
                        slug: {
                            $regex: convertToSlug(movieName), $options: "i"
                        }
                    }
                ]
            }

            const totalMovies = await MovieModel.countDocuments(query)

            if(totalMovies == 0){
                return res.json({message: "Not found movie"})
            }

            const totalPages = Math.ceil(totalMovies / moviePerPage)

            const moviesData = await MovieModel.find(query).select('_id name origin_name thumb_url slug')
            .skip((moviePerPage * page) - moviePerPage)
            .limit(moviePerPage)
           
            res.json({
                totalMovies,
                totalPages,
                moviePerPage,
                currentPage: page,
                moviesData
            })
            
        } catch (error) {
            next(error)
        }
    },

    filterMoviesByMultiField: async (req, res, next) => {
        try {
            const {category, type, country, year} = req.query 
            let query = {}
            if(category){
                query.category = category
            }
            if(type){
                query.type = type
            }
            if(country){
                query.country = country
            }
            if(year){
                query.year = year
            }
            
            const page = parseInt(req.query.page) || 1
            const moviesPerPage = parseInt(req.query.limit) || 12

            let totalMovies = await MovieModel.find(query).countDocuments()
            let totalPage = Math.ceil(totalMovies / moviesPerPage)

            const moviesData = await MovieModel.find(query).select('_id name origin_name thumb_url slug')
            .skip((moviesPerPage * page) - moviesPerPage)
            .limit(moviesPerPage)

            return res.json({
                totalMovies,
                totalPage,
                currentPage: page,
                moviesPerPage,
                moviesData
            })
        } catch (error) {
            next(error)
        }
    },
    createCommentMovie: async (req, res, next) => {
        try {
            const {userId, movieId, content} = req.body
            const movie = await MovieModel.findById(movieId)
            if(!movie){
                return res.status(404).json('Not found movie')
            }

            movie.comments.push({userComment: userId, commentContent: content, createAt: new Date()})
            await movie.save()
            return res.json(movie.comments)
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteCommentMovie: async (req, res, next) => {
        try {
            const {commentId, movieId} = req.params

            const movie = await MovieModel.findById(movieId)
            if(!movie){
                return res.status(404).json('Not found movie')
            }

            movie.comments = movie.comments.filter(comment => comment._id != commentId)
            await movie.save()

            return res.json(movie.comments)
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    createCommentForAllMovie: async (req, res, next) => {
        try {
            const userId = '63eca9fea099b1e86a2b748a'
            const content = 'Hãy chia sẻ ý kiến của bạn về bộ phim này bằng cách để lại một comment dưới đây. Nếu có bất kì lỗi gì khi xem phim, chúng tôi mong nhận được sự phản hồi từ mọi người để cải thiện website sớm nhất. Thanks for all 💛'
            const movies = await MovieModel.find({})
            
            let index = 1;
            movies.forEach( async (movie) => {
                movie.comments.push({userComment: userId, commentContent: content, createAt: new Date()})
                await movie.save()
                console.log('done ', index)
                index++
            })
            return res.json('complete')
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },
}

module.exports = movieController