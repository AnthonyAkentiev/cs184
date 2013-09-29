// FavoriteTableViewController
#import "FavoritesTableViewController.h"
#import "User.h"

@implementation FavoritesTableViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Favorite Photos";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_favorites"];
     }
     return self;
}

- (void)viewDidLoad
{
     [super viewDidLoad];    
}

- (void)viewWillAppear:(BOOL)animated {
     self.user = [User getUser];
     [self.tableView reloadData];
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
     return self.user.favoritePhotos.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
     UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

     if(cell == nil) {
          cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"Cell"];
     }

     cell.textLabel.text = [self.user.favoritePhotos[indexPath.row] title];
     cell.detailTextLabel.text = [self.user.favoritePhotos[indexPath.row] filename];
     return cell;
}

@end
