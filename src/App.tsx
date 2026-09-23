import { type ChangeEvent, useState } from 'react';

type Page = {
  id: number;
  title: string;
  body: string;
  footer: string;
};

const pageLabels = ['Home', 'Media', 'Gallery', 'Hobbies'];
const musicItems = [
  { name: 'Ashanti', label: 'Artist' },
  { name: 'Frank Ocean', label: 'Artist' },
  { name: 'Rap', label: 'Genre' },
  { name: 'R&B', label: 'Genre' },
];
const sportsTeams = [
  { name: 'San Diego Padres', sport: 'Baseball', className: 'padres-team', symbol: '⚾' },
  { name: 'Los Angeles Chargers', sport: 'Football', className: 'chargers-team', symbol: '⚡' },
];
const gallerySlotClasses = [
  'gallery-photo-top-left',
  'gallery-photo-top-right',
  'gallery-photo-center',
  'gallery-photo-bottom-left',
  'gallery-photo-bottom-right',
  'gallery-photo-bottom-center',
];
const startingGalleryImages: Array<string | null> = [
  'gallery-photo-1.jpg',
  'gallery-photo-2.jpg',
  'gallery-photo.png',
  'gallery-photo-3.jpg',
  'gallery-photo-4.jpg',
  'gallery-photo-5.jpg',
];

const startingPages: Page[] = [
  {
    id: 1,
    title: '',
    body: '',
    footer: 'Blank page',
  },
  {
    id: 2,
    title: 'Artists I Like',
    body: 'I like listening to rap and R&B.',
    footer: 'My music',
  },
  {
    id: 3,
    title: 'My Hobbies',
    body: 'I enjoy listening to music, making creative projects, spending time with friends, and exploring new ideas.',
    footer: 'Things I enjoy',
  },
  {
    id: 4,
    title: 'My Hobbies',
    body: 'I love spending time with my friends and family. I also enjoy playing sports and cheering on my favorite teams. Whether I am on the field or watching a game, sports are always something I look forward to.',
    footer: 'Things I enjoy',
  },
];

function App() {
  const [pages, setPages] = useState<Page[]>(startingPages);
  const [activePage, setActivePage] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState<string | null>('profile-photo.jpg');
  const [galleryImages, setGalleryImages] = useState<Array<string | null>>(
    startingGalleryImages,
  );

  const page = pages[activePage];

  function selectPage(index: number) {
    setActivePage(index);
  }

  function updatePage(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setPages((current) =>
      current.map((item, index) =>
        index === activePage ? { ...item, [name]: value } : item,
      ),
    );
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        setProfilePhoto(reader.result);
      }
    });
    reader.readAsDataURL(file);
  }

  function handleGalleryImageChange(slotIndex: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        setGalleryImages((current) =>
          current.map((image, index) => (index === slotIndex ? reader.result as string : image)),
        );
      }
    });
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  return (
    <div className="preview-shell">
      <header className="preview-toolbar">
        <div className="preview-toolbar-tabs">
          <button className="is-active" type="button">Preview</button>
          <button type="button">Code</button>
        </div>
        <div className="preview-toolbar-tools">
          <span aria-hidden="true">▣</span>
          <span>/</span>
          <span aria-hidden="true">↻</span>
          <span aria-hidden="true">⛶</span>
        </div>
      </header>

      <main className="page-studio">
        <div className="site-content">
          <nav className="website-nav" aria-label="Website pages">
            <button className="website-brand" type="button" onClick={() => selectPage(0)}>
              Gabriella
            </button>
            <div className="website-links">
              {pages.map((item, index) => (
                <button
                  className={`website-link ${index === activePage ? 'is-active' : ''}`}
                  key={item.id}
                  type="button"
                  onClick={() => selectPage(index)}
                >
                  {pageLabels[index]}
                </button>
              ))}
            </div>
          </nav>

          <section className="page-card" aria-label={`Page ${page.id} editor`}>
            <div className="page-editor">
              {activePage === 0 ? (
                <div className="first-page-profile">
                  <label className="profile-photo-picker">
                    {profilePhoto ? (
                      <>
                        <img src={profilePhoto} alt="Your uploaded profile photo" />
                        <span className="change-photo-badge"><span aria-hidden="true">▣</span> Change Photo</span>
                      </>
                    ) : (
                      <span className="photo-upload-placeholder"><strong>+</strong> Add one photo</span>
                    )}
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      onChange={handlePhotoChange}
                      aria-label="Add one photo to the first page"
                    />
                  </label>
                  <div className="profile-dob">
                    <strong>DOB: 06/15/12</strong>
                    <em>June 15, 2012</em>
                  </div>
                  <label className="upload-link">
                    Upload your own picture
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      onChange={handlePhotoChange}
                      aria-label="Upload your own picture"
                    />
                  </label>
                </div>
              ) : activePage === 2 ? (
                <div className="gallery-slide">
                  <div className="gallery-banner">
                    <span>My Gallery</span>
                  </div>

                  <div className="gallery-collage">
                    {gallerySlotClasses.map((slotClass, index) => (
                      <label className={`gallery-photo ${slotClass}`} key={slotClass}>
                        {galleryImages[index] ? (
                          <>
                            <img src={galleryImages[index] ?? ''} alt={`Gallery photo ${index + 1}`} />
                            <span className="gallery-change-hint">Change photo</span>
                          </>
                        ) : (
                          <span className="gallery-photo-placeholder">
                            <strong>+</strong>
                            <small>Add photo</small>
                          </span>
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.webp"
                          onChange={(event) => handleGalleryImageChange(index, event)}
                          aria-label={`Add gallery photo ${index + 1}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : activePage === 1 ? (
                <div className="media-page">
                  <textarea
                    className="page-title-input"
                    name="title"
                    value={page.title}
                    onChange={updatePage}
                    aria-label="Media page title"
                    rows={1}
                  />
                  <p className="media-page-intro">Artists and music styles I enjoy.</p>
                  <div className="music-list">
                    {musicItems.map((item) => (
                      <div className="music-item" key={item.name}>
                        <span className="music-item-icon" aria-hidden="true">♫</span>
                        <strong>{item.name}</strong>
                        <span className="music-item-label">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activePage === 3 ? (
                <div className="hobbies-page">
                  <textarea
                    className="page-title-input"
                    name="title"
                    value={page.title}
                    onChange={updatePage}
                    aria-label="Hobbies page title"
                    rows={1}
                  />
                  <p className="hobbies-page-intro">Some of the sports teams I like.</p>
                  <div className="sports-favorites">
                    {sportsTeams.map((team) => (
                      <div className="sports-card" key={team.name}>
                        <div className={`sports-card-art ${team.className}`} aria-hidden="true">
                          <span>{team.symbol}</span>
                          <strong>{team.sport}</strong>
                        </div>
                        <strong className="sports-card-name">{team.name}</strong>
                      </div>
                    ))}
                  </div>
                  <textarea
                    className="page-body-input hobbies-body-input"
                    name="body"
                    value={page.body}
                    onChange={updatePage}
                    aria-label="Hobbies page content"
                  />
                </div>
              ) : (
                <>
                  <textarea
                    className="page-title-input"
                    name="title"
                    value={page.title}
                    onChange={updatePage}
                    placeholder="Add a page title..."
                    aria-label="Page title"
                    rows={1}
                  />
                  <textarea
                    className="page-body-input"
                    name="body"
                    value={page.body}
                    onChange={updatePage}
                    placeholder="Write something about this page..."
                    aria-label="Page content"
                  />
                </>
              )}
            </div>
            <footer className="page-footer">
              <span>Page {page.id} of {pages.length}</span>
              <em>{page.footer}</em>
            </footer>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;