import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { PostDto } from 'src/dto/post-dto'

// Run e2e test:
// npm run test:e2e

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Microservice example')
  })

  it('/ (GET ID)', () => {
    return request(app.getHttpServer())
      .get('/1')
      .expect(200)
      .expect('Found ID: 1')
  })

  it('/ (GET non-exist ID)', () => {
    return request(app.getHttpServer())
      .get('/2')
      .expect(HttpStatus.NOT_FOUND)
      .expect({ statusCode: 404, message: 'Not Found' })
  })

  it('/ (POST ID)', () => {
    const sendContent: PostDto = {
      id: '123'
    }
    return request(app.getHttpServer())
      .post('/')
      .send(sendContent as PostDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual({
          id: '123',
          timestamp: expect.anything()
        })
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
