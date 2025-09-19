import {pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"

export const files = pgTable("files",{
    id: uuid("id").defaultRandom().primaryKey(),

    // file info
    name: text("name").notNull(),
    path: text("path").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),

    // storage info
    fileURL: text("file_url").notNull(),
    thumbnailURL: text("thumbnail_url"),

    // user
    userId: text("user_id").notNull(),
    parentId: text("parent_id"),

    // file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const fileRealations = relations(files,({one , many})=>({
    parent:one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),
    children: many(files)
}))

export const file = typeof files.$inferSelect 
export const newfile = typeof files.$inferInsert