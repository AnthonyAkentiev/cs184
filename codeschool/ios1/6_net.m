#import "ProfileViewController.h"
#import "UIImageView+AFNetworking.h"

@implementation ProfileViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Profile";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_profile"];
     }
     return self;
}

- (void)viewDidLoad
{
     [super viewDidLoad];
     self.view.backgroundColor = [UIColor whiteColor];

     UIImageView *profileImageView = [[UIImageView alloc] init];
     profileImageView.frame = CGRectMake(20, 20, 100, 114);

     UIImage *placeholder = [UIImage imageNamed: @"placeholder.jpg"];
     NSURL *imageURL = [NSURL URLWithString:@"http://tryios.codeschool.com/higgie_profile_image.png"];

     [profileImageView setImageWithURL:imageURL placeholderImage:placeholder];
     [self.view addSubview:profileImageView];
}

@end
