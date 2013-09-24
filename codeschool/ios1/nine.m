// Custom Buttons
#import "ProfileViewController.h"

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

     UIButton *profileButton = [UIButton buttonWithType:UIButtonTypeCustom];
     [profileButton setImage:[UIImage imageNamed:@"higgie_profile_image"] forState:UIControlStateNormal];
     [profileButton setImage:[UIImage imageNamed:@"higgie_profile_image"] forState:UIControlStateHighlighted];
     profileButton.frame = CGRectMake(15, 15, 200, 189);

     [self.view addSubview:profileButton];
}

@end
