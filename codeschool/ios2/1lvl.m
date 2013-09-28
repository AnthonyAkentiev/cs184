#import "PhotoViewController.h"
#import "UIImageView+AFNetworking.h"
#import "Photo.h"

@implementation PhotoViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.photo = [[Photo alloc] init];
          self.photo.filename = @"higgie_profile_image.png";
          self.photo.title = @"Higgie";
     }
     return self;
}

-(void)viewDidLoad {
     UIImageView *imageView = [[UIImageView alloc] init];

     [imageView setImage:[UIImage imageNamed:self.photo.filename]];
     imageView.frame = CGRectMake(10,10,300,300);

     [self.view addSubview:imageView];

     UILabel *imageTitleLabel = [[UILabel alloc] init];
     imageTitleLabel.text = self.photo.title;
     imageTitleLabel.frame = CGRectMake(11,320,300,40);

     [self.view addSubview:imageTitleLabel];
}

@end
