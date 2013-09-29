// UIAlertView

#import "PhotoViewController.h"
#import "UIImageView+AFNetworking.h"
#import "Photo.h"
#import "User.h"

@implementation PhotoViewController

-(void)viewDidLoad {
     UIImageView *imageView = [[UIImageView alloc] init];

     [imageView setImageWithURL:[NSURL URLWithString:self.photo.filename]];
     imageView.frame = CGRectMake(10,10,300,300);

     [self.view addSubview:imageView];

     UILabel *imageTitleLabel = [[UILabel alloc] init];
     imageTitleLabel.text = self.photo.title;
     imageTitleLabel.frame = CGRectMake(11,320,300,40);

     [self.view addSubview:imageTitleLabel];
}

-(void)viewWillAppear:(BOOL)animated {
     UIButton *favoriteButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     favoriteButton.frame = CGRectMake(90, 321, 200, 39);
     [favoriteButton setTitle:@"Make Favorite" forState:UIControlStateNormal];
     [self.view addSubview:favoriteButton];
     [favoriteButton addTarget:self action:@selector(makeThisPhotoAFavorite:) forControlEvents:UIControlEventTouchUpInside];
}

-(void)makeThisPhotoAFavorite:(id)sender {
     self.user = [User getUser];

     NSMutableArray *tempArray = [[NSMutableArray alloc] initWithArray:self.user.favoritePhotos];
     [tempArray addObject:self.photo];
     self.user.favoritePhotos = [[NSArray alloc] initWithArray:tempArray];
     [User saveUser:self.user];

     // --> See this one here
     UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Photo Favorited!"
          message:@"This Photo is now one of your favorite photos!"
          delegate:nil
          cancelButtonTitle:@"Hooray!"
          otherButtonTitles:nil;
     [alert show];
     [sender removeFromSuperview];
}

@end
