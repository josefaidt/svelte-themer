import { vi, beforeEach } from 'vitest'

function createLocalStorage() {
  let state = {}

  const localStorageMock = {
    getItem: vi.fn(x => state[x]),
    setItem: vi.fn((x, v) => (state[x] = v)),
    removeItem: vi.fn((x, v) => delete state[x]),
    clear: vi.fn(() => (state = {})),
  }

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
}

function createMatchMedia() {
  const matchMediaMock = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(() => {}),
    removeEventListener: vi.fn(() => {}),
    dispatchEvent: vi.fn(() => {}),
  }))
  // jest.fn().mockImplementation(query => ({
  //   matches: false,
  //   media: query,
  //   onchange: null,
  //   addListener: jest.fn(), // Deprecated
  //   removeListener: jest.fn(), // Deprecated
  //   addEventListener: jest.fn(),
  //   removeEventListener: jest.fn(),
  //   dispatchEvent: jest.fn(),
  // })),
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  })
}

beforeEach(() => {
  createLocalStorage()
  createMatchMedia()
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
