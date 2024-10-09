import Thumbnail1 from './images/blog1.jpg'
import Thumbnail2 from './images/blog2.jpg'
import Thumbnail3 from './images/blog3.jpg'
import Thumbnail4 from './images/blog4.jpg'

export const DUMMY_POSTS = [
    {
        id:'1',
        thumbnail: Thumbnail1,
        category: 'education',
        title: 'This is the title',
        desc:'lorem ipsum dolor sit amet consectetur adipisicing elit',
        authorID:3
    },
    {
        id:'2',
        thumbnail: Thumbnail2,
        category: 'education',
        title: 'first post on this blog',
        desc:'lorem ipsum dolor sit amet consectetur adipisicing elit',
        authorID:3
    },
    {
        id:'3',
        thumbnail: Thumbnail3,
        category: 'education',
        title: 'This is the title of the very first post on this blog',
        desc:'lorem ipsum dolor sit amet consectetur adipisicing elit',
        authorID:3
    },
    {
        id:'4',
        thumbnail: Thumbnail4,
        category: 'education',
        title: 'This is the title of the very first post on this blog',
        desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        authorID:3
    }
]

export const POST_CATEGORIES = ["Agriculture","Business","Education","Entertainment","Art","Investment","Weather"];